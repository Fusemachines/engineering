package com.fusemachines.engineering.nlp_tutorial.text_parsing;

import com.fusemachines.engineering.nlp_tutorial.text_parsing.NLPProviderWrappers.Fusemachines;

public class NLPProviderFactory {

	public static NLPProviderInterface getProvider(NLPProviderType type) {
		switch (type) {
		case FUSEMACHINES:
			return Fusemachines.getInstance();

		case OPENNLP:
			return Fusemachines.getInstance();

		default:
			return Fusemachines.getInstance();

		}
	}
}
