import { Field, FieldArray, Form, Formik, FormikErrors } from 'formik';
import React from 'react';
import { UserActivityRecord } from '../types';
import * as yup from 'yup';
import classnames from 'classnames';

const initial: UserActivityRecord[] = [
  {
    userId: '1',
    dateRegistration: '01.01.2020',
    dateLastActivity: '01.02.2020',
  },
  {
    userId: '2',
    dateRegistration: '01.01.2020',
    dateLastActivity: '01.02.2020',
  },
  {
    userId: '3',
    dateRegistration: '01.01.2020',
    dateLastActivity: '01.02.2020',
  },
];

const fetchData = async (data: UserActivityRecord[]) => {
  const url = 'api/useractivities/save';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    console.log('saved');
  } else {
    //TODO error
    console.log('not saved');
  }
};

const ActivityForm: React.FC = () => {
  const validationSchema = yup.object().shape({
    userRecords: yup
      .array()
      .of(
        yup.object().shape({
          userId: yup
            .number()
            .positive("Can't be negative")
            .integer('Should be integer')
            .required('Required'),
          dateRegistration: yup.date().required('Required'),
          dateLastActivity: yup
            .date()
            .required('Required')
            .min(
              yup.ref('dateRegistration'),
              "Can't be earlier than date of registration",
            ),
        }),
      )
      .required('Need at least one record!')
      .min(1, 'Need at least one record!'),
  });

  const isInvalidInput = (
    errors: FormikErrors<{ userRecords: UserActivityRecord[] }>,
    i: number,
  ) => errors && errors.userRecords && errors.userRecords[i];

  const getError = (
    errors: FormikErrors<{ userRecords: UserActivityRecord[] }>,
    i: number,
  ) => {
    console.log(errors);
    const error = errors.userRecords as UserActivityRecord[];
    return error[i];
  };

  return (
    <div className="user-activity">
      <div className="user-activity__headers">
        <span className="user-activity__header-user">User ID</span>
        <span className="user-activity__header-date">Registration date</span>
        <span className="user-activity__header-date">Last activity date</span>
      </div>
      <div className="user-activity-form">
        <Formik
          initialValues={{ userRecords: initial }}
          validationSchema={validationSchema}
          validateOnChange={false}
          onSubmit={(values) => fetchData(values.userRecords)}
        >
          {({ values, errors }) => (
            <Form>
              <FieldArray
                name="userRecords"
                render={(arrayHelpers) => (
                  <div>
                    {values.userRecords.map(
                      (user: UserActivityRecord, index: number) => (
                        <div key={index} className="input-group">
                          <div>
                            <Field
                              className={classnames(
                                'user-activity-form__user-input',
                                {
                                  'error-input': isInvalidInput(errors, index),
                                },
                              )}
                              name={`userRecords[${index}].userId`}
                            />
                            {isInvalidInput(errors, index) && (
                              <span className="user-activity-form__input-error">
                                {getError(errors, index).userId}
                              </span>
                            )}
                          </div>
                          <div>
                            <Field
                              className="user-activity-form__date-input"
                              name={`userRecords[${index}].dateRegistration`}
                            />
                            {isInvalidInput(errors, index) && (
                              <span className="user-activity-form__input-error">
                                {getError(errors, index).dateRegistration}
                              </span>
                            )}
                          </div>
                          <div>
                            <Field
                              className="user-activity-form__date-input"
                              name={`userRecords[${index}].dateLastActivity`}
                            />
                            {isInvalidInput(errors, index) && (
                              <span className="user-activity-form__input-error">
                                {getError(errors, index).dateLastActivity}
                              </span>
                            )}
                          </div>
                          <button
                            type="button"
                            className="user-activity-form__remove-button"
                            onClick={() => arrayHelpers.remove(index)}
                          ></button>
                        </div>
                      ),
                    )}
                    <button
                      type="button"
                      className="user-activity-form__new-button"
                      onClick={() =>
                        arrayHelpers.push({
                          userId: '',
                          dateRegistration: '',
                          dateLastActivity: '',
                        })
                      }
                    ></button>
                    {typeof errors.userRecords === 'string' ? (
                      <div>{errors.userRecords}</div>
                    ) : null}
                    <div className="user-activity-form__save-button-content">
                      <button
                        type="submit"
                        className="user-activity-form__save-button"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ActivityForm;
