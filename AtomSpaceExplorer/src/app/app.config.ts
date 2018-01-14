/*
 * Configuration parameters
 */
export const configs = {
  'url': 'http://localhost:7070/api/',
  'opencog_url': 'http://localhost:5000/api/v1.1',
  'opencog_url_timeout': '10000',

  // Link types that end with any of the values in this parameter are considered as symmetric link types
  'unordered_linktype_roots': [ 'EquivalenceLink', 'IdenticalLink', 'EqualLink', 'UnorderedLink', 'SetLink',
                                'SimilarityLink', 'PresentLink', 'ParallelLink', 'JoinLink', 'CosenseLink' ],

  // Built-in 'Load Sample Data' options from assets directory. Uncomment one of the following:
  // 'sample_data_file': 'atoms.sample1.json'
  // 'sample_data_file': 'atoms.sample1a.json'
  // 'sample_data_file': 'atoms.sample1b.json'
  // 'sample_data_file': 'atoms.sample2.json'
  // 'sample_data_file': 'atoms.sample2a.json'
  // 'sample_data_file': 'atoms.sample2b.json'
  // 'sample_data_file': 'atoms.humans.json'
  // 'sample_data_file': 'atoms.oovc_ensemble.json'
  'sample_data_file': 'atoms.oovc_ensemble_sti.json'
};
