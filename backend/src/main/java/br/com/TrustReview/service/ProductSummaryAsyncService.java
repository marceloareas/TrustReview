package br.com.TrustReview.service;

import br.com.TrustReview.model.Product;
import br.com.TrustReview.model.Review;
import br.com.TrustReview.repository.ProductRepository;
import br.com.TrustReview.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

    @Async("sentimentAsyncExecutor")
    public void updateProductSummaryAsync(Product product) {

        log.info("🔥 Gerando resumo (ASYNC) para produto id={}", product.getId());

        try {
            // ✅ Recarrega o produto dentro desta transação
            Product managedProduct = productRepository.findById(product.getId())
                .orElseThrow(() -> new RuntimeException("Produto não encontrado: " + product.getId()));

            List<Review> reviews = reviewRepository.findByProductId(managedProduct);

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

            log.info("✅ Resumo do produto {} atualizado.", managedProduct.getId());

        } catch (Exception e) {
            log.error("❌ Erro ao gerar resumo do produto {}.", product.getId(), e);
        }
    }
}
