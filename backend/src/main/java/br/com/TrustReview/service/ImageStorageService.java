package br.com.TrustReview.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ImageStorageService {
    
    // Salva as imagens em src/main/resources/static
    private final Path uploadDir = Paths.get(System.getProperty("user.dir"), "src", "main", "resources", "static");

    public ImageStorageService() throws IOException {
        try {
            if (!Files.exists(uploadDir)) {
                log.info("Criando diretório de upload de imagens em: " + uploadDir.toAbsolutePath());
                Files.createDirectories(uploadDir);
            }
        } catch (Exception e) {
            log.error("Erro ao criar diretório de upload de imagens", e);
            throw e;
        }
        
    }

    public String saveImage(MultipartFile file) {
        try {
            log.info("[saveImage] Recebendo arquivo: originalFilename={}, size={} bytes, isEmpty={}",
                    file.getOriginalFilename(), file.getSize(), file.isEmpty());

            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path destination = uploadDir.resolve(filename);
            log.info("[saveImage] Salvando arquivo em: {}", destination.toAbsolutePath());
            Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);
            log.info("[saveImage] Imagem salva com sucesso: {} em {}", filename, destination.toAbsolutePath());
            // Retorna apenas o nome do arquivo, pois estará disponível em /<filename> via static
            return "/" + filename;
        } catch (IOException e) {
            log.error("[saveImage] Erro ao salvar imagem", e);
            throw new RuntimeException("Erro ao salvar imagem", e);
        }
    }
}
