import React, { Fragment } from "react";
import Modal from "../../UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends React.Component {
    state = {
      error: null
    };

    componentWillMount() {
      // console.log("componentDidMount => ");
      axios.interceptors.request.use(
        request => {
          return request;
        },
        error => {
          this.setState({ error: null });
        }
      );

      axios.interceptors.response.use(
        response => {
          return response;
        },
        error => {
          this.setState({
            error: error
          });
        }
      );
      console.log(this.state.error);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      console.log("Error handler");
      return (
        <Fragment>
          <Modal
            modalClose={this.errorConfirmedHandler}
            show={this.state.error}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Fragment>
      );
    }
  };
};

export default withErrorHandler;
