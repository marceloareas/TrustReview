from .NLPTownAdapter import NLPTownAdapter
from .PysentimientoAdapter import PysentimientoAdapter

ADAPTERS = {
    "NPLTOWN_BERT": NLPTownAdapter(),
    "PYSENTIMIENTO_ROBERTA": PysentimientoAdapter()
}
