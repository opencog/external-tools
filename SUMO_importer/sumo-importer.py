import fileinput                     #*******
from opencog.atomspace import AtomSpace, TruthValue, types
import sys
reload(sys)  
#sys.setdefaultencoding('Cp1252')
#sys.setdefaultencoding('utf8')

DEFAULT_NODE_TV = TruthValue(0.01, 1000)
DEFAULT_LINK_TV = TruthValue(0.9, 100)
DEFAULT_PREDICATE_TV = TruthValue(0.1, 100)

atomspace=None


def removeExtra (orgString, index):
   #removes the parenthesis at the given index
   newSymbolString = orgString[:index]  + orgString[index+1:]
   #print ("removed and sent back through")  
   return newSymbolString
   
   
def match_parenthesis (symbolString):
  ## close any and all open parenthesises & return a "file" to be processed further... 
  from pythonds.basic.stack import Stack
  s = Stack()
  balanced = True
  index = 0
  while index < len(symbolString) and balanced:
        symbol = symbolString[index]
        if symbol == "(":
            s.push(symbol+ str(index))
        elif symbol == ")":
            if s.isEmpty():
                balanced = False
            else:
                s.pop()

        index = index + 1

  if balanced and s.isEmpty():
        #print ("it is FINALLY balanced!")
        return symbolString
  elif balanced and not s.isEmpty():
        #print "opening barace is not closed at " 
        
        idx = int (s.pop().strip("("))
        #print idx
        #print symbolString[idx]
        return (match_parenthesis(removeExtra(symbolString,idx))) 
  else:   #couldn't pop from stack
        #print "extra closing present at"
        #print index
        return (match_parenthesis(removeExtra(symbolString,index-1))) 

def skip_comments(myfile):
    
    '''You can't use this function directly because it would break parsing of multiline expressions'''
    copying = True 

    for line in myfile:

        '''' skip documentation and such'''
        if copying:
            if line.startswith('(documentation ') \
               or line.startswith('(termFormat ') \
               or line.startswith('(format ') \
               or line.startswith('(externalImage '):
                if '")' in line:
                    line = ""
                    copying = True
                else: 
                    copying = False
        elif '")' in line and copying == False:
            line = ""
            copying = True   

        if copying == False:
            line = ""

        '''' skip comments'''
        if not ';' in line:
            line = line.rstrip()
            yield line

def read_file(filename):
    with open (filename, 'rt') as myfile:
        return '\n'.join(skip_comments(myfile))

def parse_kif_string(inputdata):
    '''Returns a list containing the ()-expressions in the file.
    Each list expression is converted into a Python list of strings. Nested expressions become nested lists''' 
    # Very simple one which can't handle quotes properly for example
    
    #*** Check that parenthisis is mathced on input data
    matched = match_parenthesis(inputdata)
    # print "GOING SMOOTH!!"

    from pyparsing import OneOrMore, nestedExpr
    data = OneOrMore(nestedExpr()).parseString(matched)
           # The sExpression (i.e. lisp) parser is cool, but doesn't work for some reason (it might be the '?' characters at the start of variable names?)

           #from sExpParser import sexp, ParseFatalException, OneOrMore
           #try:
           #    sexprs = OneOrMore(sexp).parseString(inputdata, parseAll=True)
           #    data = sexprs.asList()
           #except ParseFatalException, pfe:
           #    print "Error:", pfe.msg
           #    print pfe.markInputline('^')
  
    return data
 

def convert_multiple_expressions(expressions):
    for expression in expressions:
        convert_expression(expression)

def convert_expression(expression, link_tv=DEFAULT_LINK_TV):
    if isinstance(expression,str):
        return convert_token(expression)
    else:
        return convert_list(expression, link_tv)

def convert_token(token):
    if token.startswith('?'):
        return atomspace.add_node(types.VariableNode, token)
    elif token.startswith('"'):
        word = token[1:-2]
        return atomspace.add_node(types.ConceptNode, word, tv=DEFAULT_NODE_TV)
    else:
        return atomspace.add_node(types.ConceptNode, token, tv=DEFAULT_NODE_TV)

def convert_list(expression, link_tv):
    predicate = expression[0]
    arguments = expression[1:]
    
    arguments_atoms = [convert_expression(expr, link_tv=None) for expr in arguments]
    #print link (predicate, arguments_atoms, link_tv)
    
    return link(predicate, arguments_atoms, link_tv)

def link(predicate, arguments, link_tv):
    # Remove things with "" in them
    if predicate in ['documentation','externalImage']:
        return None

    link_type = special_link_type(predicate)

    if link_type:
        return atomspace.add_link(link_type, arguments, tv=link_tv)
    else:
        if predicate.endswith('Fn'):
            link_type = types.ExecutionLink
            node_type = types.SchemaNode
        else:
            link_type = types.EvaluationLink
            node_type = types.PredicateNode

        node = atomspace.add_node(node_type, predicate, tv=DEFAULT_PREDICATE_TV)
        return atomspace.add_link(link_type, [node,
            atomspace.add_link(types.ListLink, arguments)],
            tv=link_tv)

def special_link_type(predicate):
    mapping = {
        '=>':types.ImplicationLink,
        '<=>':types.EquivalenceLink,
        'and':types.AndLink,
        'or':types.OrLink,
        'not':types.NotLink,
        'instance':types.InheritanceLink,
        # This might break some of the formal precision of SUMO, but who cares
        'attribute':types.InheritanceLink,
        'member':types.MemberLink,
        'subclass':types.InheritanceLink,
        'exists':types.ExistsLink,
        'forall':types.ForAllLink,
        'causes':types.ImplicationLink
        }

    if predicate in mapping:
        return mapping[predicate]
    else:
        return None

def print_links(file):
    for atom in atomspace:
        if atom.is_a(types.Link) and atom.tv.count > 0:
            file.write(repr(atom))

def loadSUMO(atomspace_, filename):
    global atomspace
    atomspace = atomspace_
    
    file_str = read_file(filename)
    expressions = parse_kif_string(file_str)
    convert_multiple_expressions(expressions)

def loadSumoAndExportToScheme(atomspace, filename):
    atomspace.clear()

    output_filename = filename[0:-4]+'.scm'
    print output_filename

    loadSUMO(atomspace, filename)

    with open(output_filename, 'w' ) as out:
        print_links(out)

if __name__ == '__main__':
    import sys
    filename = sys.argv[1]
    atomspace = AtomSpace()

    loadSumoAndExportToScheme(atomspace, filename)

