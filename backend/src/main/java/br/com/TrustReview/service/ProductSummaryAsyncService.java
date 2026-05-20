package br.com.TrustReview.service;

import br.com.TrustReview.model.Product;
import br.com.TrustReview.model.Review;
import br.com.TrustReview.repository.ProductRepository;
import br.com.TrustReview.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductSummaryAsyncService {

    private final ResumoService resumoService;
    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;

    @Value("${summary.min-reviews}")
    private int minReviewsToSummarize;

    @Async("sentimentAsyncExecutor")
    public void updateProductSummaryAsync(Product product) {

        log.info("Gerando resumo (ASYNC) para produto id={}", product.getId());

        try {
            Product managedProduct = productRepository.findById(product.getId())
                .orElseThrow(() -> new RuntimeException("Produto não encontrado: " + product.getId()));

            List<Review> reviews = reviewRepository.findByProductId(managedProduct);

            //Só gera resumo se tiver o mínimo de reviews configurado
            if (reviews.size() % minReviewsToSummarize != 0) {
                log.info(
                    "⏭️ Produto {} não tem novas reviews suficientes para atualização ({}). Resumo não gerado.",
                    managedProduct.getId(),
                    minReviewsToSummarize
                );   
                  
                return;
            } else {
                log.info(
                    "Produto {} tem {} reviews. Gerando resumo (mínimo para atualizar: {}).",
                    managedProduct.getId(),
                    reviews.size(),
                    minReviewsToSummarize
                );
            }

            List<String> pros = reviews.stream()
                .filter(r -> r.getPros() != null)
                .flatMap(r -> r.getPros().stream())
                .toList();

            List<String> cons = reviews.stream()
                .filter(r -> r.getCon() != null)
                .flatMap(r -> r.getCon().stream())
                .toList();

            String summary = resumoService.summarizeReviews(
                managedProduct.getName(),
                managedProduct.getDescription(),
                pros,
                cons
            );

            if (!StringUtils.hasText(summary)) {
                log.warn(
                    "⚠️ Resumo não gerado (vazio/nulo). Mantendo valor atual. produtoId={}",
                    managedProduct.getId()
                );
                return;
            }

            managedProduct.setSummary(summary.trim());
            productRepository.save(managedProduct);

            log.info("Resumo do produto {} atualizado.", managedProduct.getId());

        } catch (Exception e) {
            log.error("❌ Erro ao gerar resumo do produto {}.", product.getId(), e);
        }
    }
}