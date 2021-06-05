import React, {ChangeEvent} from 'react';
import {withFormik, FormikProps} from 'formik';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import {DEFAULT_NEW_QUESTION, INewQuestion} from '~/types/IQuestions';

import './question.scss';

const validationSchema = yup.object().shape({
  question: yup.string().required('Required field'),
  choices: yup.array().of(yup.string().required())
});

export interface OwnProps {
  title: string;
  question?: Maybe<INewQuestion>;
  onSubmit: (val: INewQuestion) => void;
  onCancel: () => void;
}

type IQuestionForm = OwnProps & FormikProps<INewQuestion>;

const QuestionForm = ({
  onCancel,
  title,
  values,
  errors = {},
  handleSubmit,
  handleChange,
  handleReset,
  setFieldValue
}: IQuestionForm): JSX.Element => {
  const handleChoice = (val: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>, idx: number) => {
    const newChoices = [...values.choices.slice(0, idx), val.target.value, ...values.choices.slice(idx + 1)];

    setFieldValue('choices', newChoices);
  };

  const handleAddChoice = () => {
    const newChoices = [...values.choices, ''];

    setFieldValue('choices', newChoices);
  };

  const handleRemoveChoice = (idx: number) => {
    const newChoices = [...values.choices.slice(0, idx), ...values.choices.slice(idx + 1)];

    setFieldValue('choices', newChoices);
  };

  return (
    <div className="form-wrapper">
      <Typography variant="h5">{title}</Typography>
      <form onSubmit={handleSubmit} className="form">
        <TextField
          label="Question"
          name={'question'}
          value={values?.question}
          onChange={handleChange}
          error={!!errors?.question}
          helperText={errors?.question}
          className="form-field"
        />
        {values.choices.map((val, idx) => {
          const value = values.choices[idx];

          return (
            <div className="field-row" key={`ch${idx}`} >
              <TextField
                label={`Choice[${idx}]`}
                value={values.choices[idx] || ''}
                onChange={(e) => handleChoice(e, idx)}
                error={!value}
                helperText={!value ? `Hasn't be empty` : ''}
                className="form-field"
              />
              <div
                role="button"
                onClick={!idx ? handleAddChoice : () => handleRemoveChoice(idx)}
                onKeyDown={!idx ? handleAddChoice : () => handleRemoveChoice(idx)}
                tabIndex={idx}
                className="field-btn"
              >
                {!idx ? '+' : '-'}
              </div>
            </div>
          );
        })}

        <div className={'form-btn-wrapper'}>
          <Button type="submit" color="primary" className={'form-btn'} variant="contained">
            Submit
          </Button>
          <Button type="button" className={'form-btn'} onClick={handleReset}>
            Reset
          </Button>
          <Button type="button" className={'form-btn'} onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default withFormik<OwnProps, INewQuestion>({
  mapPropsToValues() {
    return DEFAULT_NEW_QUESTION;
  },
  validationSchema,
  validateOnChange: false,
  enableReinitialize: true,
  async handleSubmit(values, {props}) {
    props.onSubmit(values);
  }
})(QuestionForm);