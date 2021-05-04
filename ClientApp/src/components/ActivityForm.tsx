import { Field, FieldArray, Form, Formik } from 'formik';
import React from 'react';
import './styles.sass';

type UserActivityRecord = {
  userId: string;
  dateRegistration: string;
  dateLastActivity: string;
};

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
  return (
    <div className="input-group mb-3">
      <Formik
        initialValues={{ users: initial }}
        onSubmit={(values) => fetchData(values.users)}
      >
        {({ values }) => (
          <Form>
            <FieldArray
              name="users"
              render={(arrayHelpers) => (
                <div>
                  {values.users.map(
                    (user: UserActivityRecord, index: number) => (
                      <div key={index}>
                        <Field
                          className="user-activity-form__user-input"
                          name={`users[${index}].userId`}
                        />
                        <Field
                          className="user-activity-form__date-input"
                          name={`users[${index}].dateRegistration`}
                        />
                        <Field
                          className="user-activity-form__date-input"
                          name={`users[${index}].dateLastActivity`}
                        />
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          -
                        </button>
                      </div>
                    ),
                  )}
                  <button
                    type="button"
                    onClick={() =>
                      arrayHelpers.push({
                        userId: '',
                        dateRegistration: '',
                        dateLastActivity: '',
                      })
                    }
                  >
                    +
                  </button>
                  <div>
                    <button type="submit">Submit</button>
                  </div>
                </div>
              )}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ActivityForm;
