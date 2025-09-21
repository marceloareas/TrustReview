package br.com.TrustReview.config;

import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

/**
 * Configuração da documentação OpenAPI (Swagger) para a aplicação.
 *
 * <p>
 * Esta classe define as informações globais da API, como título, descrição, versão,
 * contato e licença, além de configurar o agrupamento de endpoints públicos e o esquema
 * de segurança JWT Bearer para autenticação.
 * </p>
 *
 * <ul>
 *   <li>Define o grupo "public" para expor todos os endpoints.</li>
 *   <li>Adiciona esquema de segurança do tipo Bearer JWT para autenticação.</li>
 *   <li>Personaliza informações da API exibidas na interface Swagger UI.</li>
 * </ul>
 *
 * @author HernaniFilho
 */
@Configuration
@OpenAPIDefinition(
        info =  @Info(
                title = "Backend API TrustReview",
                description = "Documentação da API de TrustReview",
                version     = "0.1.0",
                contact     = @Contact(name = "Equipe Dev", email = "dev@exemplo.com"),
                license     = @License(
                        name = "Liçenca Livre"
                )
        )
)
public class OpenAPIConfig {

    /**
     * Agrupa todos os endpoints públicos da API.
     *
     * @return configuração do agrupamento de endpoints
     */
    @Bean
    public GroupedOpenApi publicAPI(){
        return GroupedOpenApi.builder()
                .group("public")
                .pathsToMatch("/**")
                .build();
    }

    /**
     * Configura o esquema de segurança JWT Bearer e componentes OpenAPI.
     *
     * @return objeto OpenAPI customizado
     */
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .components(new Components()
                        .addSecuritySchemes("bearerAuth",
                                new SecurityScheme()
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")
                        ))
                .addSecurityItem(new SecurityRequirement().addList("bearerAuth"));

    }
}
