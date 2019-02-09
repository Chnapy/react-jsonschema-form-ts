import * as React from "react";
import {JSONSchema6} from "json-schema";
import Form, {
    AjvError,
    ArrayFieldTemplateProps,
    ErrorListProps,
    Field,
    FieldTemplateProps,
    FormProps,
    FormValidation,
    IChangeEvent,
    ISubmitEvent,
    ObjectFieldTemplateProps,
    UiSchema,
    Widget
} from "react-jsonschema-form";


export interface ISchemaFormProps<D extends object> {
    schemas: JSONSchema6[];
    uiSchema: UiSchema;
    formData: D;

    onChange: (e: IChangeEvent<D>) => void;
    onSubmit: (e: ISubmitEvent<D>) => void;
    onError: (e: any) => void;

    disabled?: boolean;
    formContext?: any;
    widgets?: { [name: string]: Widget };
    fields?: { [name: string]: Field };
    noValidate?: boolean;
    noHtml5Validate?: boolean;
    showErrorList?: boolean;
    ErrorList?: React.FunctionComponent<ErrorListProps>;
    validate?: (formData: D, errors: FormValidation) => FormValidation;
    liveValidate?: boolean;
    FieldTemplate?: React.FunctionComponent<FieldTemplateProps>;
    ArrayFieldTemplate?: React.FunctionComponent<ArrayFieldTemplateProps>;
    ObjectFieldTemplate?: React.FunctionComponent<ObjectFieldTemplateProps>;
    safeRenderCompletion?: boolean;
    transformErrors?: (errors: AjvError[]) => AjvError[];
    idPrefix?: string;

    // HTML Attributes
    id?: string;
    className?: string;
    name?: string;
    method?: string;
    target?: string;
    action?: string;
    autocomplete?: string;
    enctype?: string;
    acceptcharset?: string;
}

export interface ISchemaFormState<D extends object> {
    step: number;
    formData: D;
}

export default class SchemaForm<D extends object> extends React.PureComponent<ISchemaFormProps<D>, ISchemaFormState<D>> {

    // private form: Form<D> | null;

    constructor(props: ISchemaFormProps<D>) {
        super(props);
        // this.form = null;
        this.state = {
            step: 0,
            formData: props.formData
        };
    }

    // private refForm = (form: Form<D> | null) => this.form = form;

    onChange = (e: IChangeEvent<D>) => {
        const {onChange} = this.props;

        onChange(e);
    };

    onSubmit = (e: ISubmitEvent<D>) => {
        const {schemas, onSubmit} = this.props;
        const {step, formData} = this.state;

        const nextStep = step + 1;

        if (schemas[nextStep]) {

            this.setState({
                step: nextStep,
                formData: Object.assign({},
                    formData,
                    e.formData
                )
            });

        } else {

            onSubmit(e);
        }
    };

    onError = (e: any) => {
        const {onError} = this.props;

        onError(e);
    };

    render(): JSX.Element {

        const {
            schemas, uiSchema,
            disabled, formContext, widgets, fields, noValidate, noHtml5Validate, showErrorList,
            ErrorList, validate, liveValidate, FieldTemplate, ArrayFieldTemplate, ObjectFieldTemplate,
            safeRenderCompletion, transformErrors, idPrefix,
            id, className, name, method, target, action, autocomplete, enctype, acceptcharset
        } = this.props;

        const {step, formData} = this.state;

        const propsToForm: FormProps<D> = {
            schema: schemas[step], formData, uiSchema,
            disabled, formContext, widgets, fields, noValidate, noHtml5Validate, showErrorList,
            ErrorList, validate, liveValidate, FieldTemplate, ArrayFieldTemplate, ObjectFieldTemplate,
            safeRenderCompletion, transformErrors, idPrefix,
            id, className, name, method, target, action, autocomplete, enctype, acceptcharset
        };

        return (
            <Form
                // ref={this.refForm}
                {...propsToForm}
                // schema={schemas[step]}
                // uiSchema={uiSchema}
                // formData={formData}
                onChange={this.onChange}
                onSubmit={this.onSubmit}
                onError={this.onError}
            />
        );
    }

}