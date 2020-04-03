import React from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/user-actions";
class RegisterLogin extends React.Component {
    state = {
        email: "",
        password: "",
        errors: []
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    isFormValid = ({ email, password }) => email && password;
    submitForm = event => {
        event.preventDefault();
        let dataToSubmit = {
            email: this.state.email,
            password: this.state.password
        };
        if (this.isFormValid(this.state)) {
            this.setState({ errors: [] });
            this.props.dispatch(loginUser(dataToSubmit)).then(response => {
                if (response.payload.loginSuccess === true) {
                    this.props.history.push("/");
                } else {
                    this.setState({
                        errors: this.state.errors.concat("Failed to log in")
                    });
                }
            });
        } else {
            this.setState({
                errors: this.state.errors.concat("Form is not valid")
            });
        }
    };

    displayErrors = errors => errors.map((err, i) => <p key={i}>{err}</p>);

    render() {
        return (
            <div className="container">
                <h2>Log In</h2>
                <div className="row">
                    <form
                        className="col s12"
                        onSubmit={e => this.submitForm(e)}
                    >
                        <div className="row">
                            <div className="input-field col s12">
                                <input
                                    name="email"
                                    id="email"
                                    type="email"
                                    className="validate"
                                    value={this.state.email}
                                    onChange={e => this.handleChange(e)}
                                />
                                <label htmlFor="email">Email</label>
                                <span
                                    className="helper-text"
                                    data-error="Type a right email"
                                    data-success="Right"
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12">
                                <input
                                    name="password"
                                    id="password"
                                    type="password"
                                    className="validate"
                                    value={this.state.password}
                                    onChange={e => this.handleChange(e)}
                                />
                                <label htmlFor="password">Passoword</label>
                                <span
                                    className="helper-text"
                                    data-error="Type a right password"
                                    data-success="Right"
                                />
                            </div>
                        </div>
                        <div className="row">
                            {this.state.errors.length > 0 && (
                                <div>
                                    {this.displayErrors(this.state.errors)}
                                </div>
                            )}
                            <div className="col s12">
                                <button
                                    className="btn waves-effect red lighten-2"
                                    type="submit"
                                    name="action"
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        user: state.usersReducer
    };
};

export default connect(mapStateToProps)(RegisterLogin);
