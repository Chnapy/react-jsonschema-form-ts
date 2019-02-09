/**
 * @class ExampleComponent
 */

import * as React from 'react';

import schema1 from './schema1';
import schema2 from './schema2';

import {IChangeEvent, ISubmitEvent, UiSchema} from "react-jsonschema-form";
import SchemaForm from "./SchemaForm";

interface SchemaType {

}

const uiSchema: UiSchema = {

};

const formData = {

};

export default class ExampleComponent extends React.Component {

  onFormChange = (e: IChangeEvent<SchemaType>) => {
    console.log('change', e);
  };

  onFormSubmit = (e: ISubmitEvent<SchemaType>) => {
    console.log('submit', e);
  };

  onFormError = (e: any) => {
    console.log('error', e);
  };

  render() {

    console.log(process.env);
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>

          <SchemaForm
            schemas={[schema1 as any, schema2]}
            uiSchema={uiSchema}
            formData={formData}
            onChange={this.onFormChange}
            onSubmit={this.onFormSubmit}
            onError={this.onFormError}
          />

        </header>
      </div>
    );
  }
}
