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
    
    private final Path uploadDir = Paths.get("uploads");

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
            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path destination = uploadDir.resolve(filename);
            Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);
            log.info("Imagem salva com sucesso: " + filename + " em " + destination.toAbsolutePath());
            return "/uploads/" + filename; // caminho público ou relativo
        } catch (IOException e) {
            throw new RuntimeException("Erro ao salvar imagem", e);
        }
    }
}
