package com.fusemachines.engineering.nlp_tutorial.text_parsing;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
/**
 * 
 */
import org.springframework.web.bind.annotation.RestController;

import com.fusemachines.engineering.nlp_tutorial.text_parsing.models.ParsedText;
import com.fusemachines.engineering.nlp_tutorial.text_parsing.models.UserText;

/**
 * 
 * @author mars
 *
 * @version 0.0.1
 * @since 06-14-2016
 */
@RestController
public class Controller {
	private static final Logger LOGGER = LoggerFactory.getLogger(Controller.class);
    @RequestMapping("nlp/v1/parse-text")
    public ParsedText parseText(@RequestParam(value="text", defaultValue="World") String text) {
        
        UserText userText = new UserText(text);
        LOGGER.info("{} => {}", text, userText);
        System.out.printf("%s => %s\n", text, userText);
    	return Service.getInstance().parse(userText);
    }
}
