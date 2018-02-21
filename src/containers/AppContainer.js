import React from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';
import List from '../components/List';
import Details from '../components/Details';
import AddForm from '../components/AddForm';
import Alert from '../components/Alert';

import A from '../actions/appActions';
import FA from '../actions/formActions';
import { VALIDATE_LOCATION, TEST_MODE } from '../config';

class AppContainer extends React.Component {

    componentDidMount() {
        this.props.fetchObservations();
    }

    toggleAddForm() {
        if(this.props.addModeOn) {
            return <AddForm 
                        obsPoints={this.props.obsPoints}
                        formData={this.props.formData}
                        formChange={this.props.formChange}
                        submitForm={this.props.submitForm}
                        cancelForm={this.props.cancelForm}
                        formError={this.props.formError}
                        toggleTestMode={this.props.toggleTestMode}
                        testMode={this.props.testMode}
                    />
        };
    }

    toggleDetailsAndList() {
        if(this.props.selectedObsPoint != -1) {
            return <Details 
                        obsPointID={this.props.selectedObsPoint} 
                        unselectObservation={this.props.unselectObservation}
                        obsPoints={this.props.obsPoints}
                    />;
         } else {
             return <List 
                        selectObservation={this.props.selectObservation}
                        obsPoints={this.props.obsPoints}
                        fetchFailed={this.props.fetchFailed}
                    />;
         }
    }

    render() {
        return(
            <div>
                <Header 
                    toggleAddMode={this.props.toggleAddMode} 
                    fetchFailed={this.props.fetchFailed}
                />
                {(this.props.postSuccess) ? <Alert type='success' msg='Observation added!'/> : ''}
                {(this.props.fetchFailed) ? <Alert type='danger' msg='Could not fetch observations'/> : ''}
                <div className='container'>
                    {this.toggleAddForm()}
                    {this.toggleDetailsAndList()}    
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        addModeOn: state.appReducer.addModeOn,
        selectedObsPoint: state.appReducer.selectedObsPoint,
        obsPoints: state.appReducer.obsPoints,
        fetchFailed: state.appReducer.fetchFailed,
        formData: state.formReducer.formData,
        formError: state.formReducer.formError,
        postSuccess: state.formReducer.postSuccess,
        testMode: state.appReducer.testMode
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleAddMode: () => dispatch(A.toggleAddMode()),
        selectObservation: (id) => dispatch(A.selectObservation(id)),
        unselectObservation: () => dispatch(A.unselectObservation()),
        fetchObservations: () => dispatch(A.fetchObservations()),
        formChange: (target) => dispatch(FA.formChange(target)),
        submitForm: (formData, obsPoints) => dispatch(FA.submitForm(formData, obsPoints)),
        cancelForm: () => dispatch(FA.cancelForm()),
        toggleTestMode: () => dispatch(A.toggleTestMode())
    }
};

AppContainer = connect(mapStateToProps, mapDispatchToProps)(AppContainer);

export default AppContainer;