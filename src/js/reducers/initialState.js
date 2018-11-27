/* ----------  Models  ---------- */
import User from '../models/user';

export default {
  FileManager: {
    isLoading: false,
    files: []
  },
  Trello: {
    list: {},
    card: {}
  },
  NaturalForm: {
    form: {},
    activeFieldId: '0'
  },
  UI: {
    theme: 'default'
  },
  Auth: {
    User
  },
}
