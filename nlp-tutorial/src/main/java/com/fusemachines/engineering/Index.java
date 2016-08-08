package com.fusemachines.engineering;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Mars<mars@fusemachines.com>
 * @date June 14, 2016
 *
 */
@RestController
@RequestMapping("")
public class Index {
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public Map<String, String> index(){
		Map<String, String> welcomeMessage = new HashMap<String, String>();
		welcomeMessage.put("title", "Tell People How AI works");
		welcomeMessage.put("description", "Demos of Machine learning and NLP functions");
		return welcomeMessage;	
		
	}
}