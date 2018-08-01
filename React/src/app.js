class App extends Component {
    render() {
      return (
        <Router history={hashHistory}>
          <Route path='/' component={Home} />
          <Route path='/search' component={Search} />
        </Router>
      )
    }}