package rapids.monitor;

import lombok.Data;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClients;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import sun.plugin2.message.Message;

import java.io.IOException;
import java.text.MessageFormat;
import java.util.List;

/**
 * @author David on 17/6/17.
 */
@EnableAutoConfiguration
@ConfigurationProperties("monitor")
@Data
public class Application implements CommandLineRunner{
    private static Logger LOGGER = LoggerFactory.getLogger(Application.class);
    public static void main(String[] args) throws Exception {
        SpringApplication.run(Application.class, args);
    }

    @SuppressWarnings("MismatchedQueryAndUpdateOfCollection")
    private List<String> targets;
    private SimpleMailMessage mailTemplate;
    private @Autowired JavaMailSender javaMailSender;

    @Override
    public void run(String... args) throws Exception {
        HttpClient client = HttpClients.createDefault();
        targets.forEach(target -> {
            try {
                HttpResponse response = client.execute(new HttpGet(target));
                int status = response.getStatusLine().getStatusCode();
                if(status != HttpStatus.SC_OK) {
                    SimpleMailMessage simpleMailMessage = new SimpleMailMessage(this.mailTemplate);
                    String newText = MessageFormat.format(simpleMailMessage.getText(), target, String.valueOf(status));
                    simpleMailMessage.setText(newText);
                    javaMailSender.send(simpleMailMessage);
                }else {
                    LOGGER.info("monitor access OK, target: {}, status: {}", target, status);
                }
            } catch (IOException e) {
                LOGGER.error("monitor execute error", e);
            }
        });

    }

}
