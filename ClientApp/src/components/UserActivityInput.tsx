import React, { useEffect } from 'react';
import { UserActivityRecord } from '../types/app';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useFieldArray } from 'react-hook-form';
import { DateTime } from 'luxon';

const sendData = async ({ records }: { records: UserActivityRecord[] }) => {
  const url = 'api/useractivities/save';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(records),
  });

  if (response.ok) {
    console.log('saved');
  } else {
    //TODO error
    console.log('not saved');
  }
};

type FormValues = {
  records: UserActivityRecord[];
};

// const exactFormatOfDateCheck = {
//   name: 'dateFormatCheck',
//   exclusive: false,
//   message: 'Format of date should be DD.MM.YYYY',
//   test: (value: Date | undefined) =>
//     value || (value as string).search(/\d{2}\.\d{2}\.\d{4}/gm) >= 0,
// };

const UserActivityInput: React.FC = () => {
  const validationSchema = yup.object().shape({
    records: yup.array().of(
      yup.object().shape({
        user: yup
          .number()
          .typeError('User ID should be a number')
          .positive("Can't be negative")
          .integer('Should be an integer')
          .required('User ID is required'),
        dateRegistration: yup
          .string()
          .typeError('Registration date - not a date')
          .required('Registration date is required')
          .matches(/\d{2}\.\d{2}\.\d{4}/gm, 'Registration date - not a date')
          .test(
            'dateParse',
            'Registration date - not a date',
            (value: string) => {
              const date = DateTime.fromFormat(value, 'dd.MM.yyyy');
              return date.isValid;
            },
          ),
        dateLastActivity: yup
          .string()
          .typeError('Last activity date - not a date')
          .required('Last activity date is required')
          .matches(/\d{2}\.\d{2}\.\d{4}/gm, 'Registration date - not a date')
          .test(
            'dateParse',
            'Registration date - not a date',
            (value: string) => {
              const date = DateTime.fromFormat(value, 'dd.MM.yyyy');
              return date.isValid;
            },
          ),
      }),
    ),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      records: [
        {
          userId: undefined,
          dateRegistration: '',
          dateLastActivity: '',
        },
      ],
    },
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'records',
  });

  useEffect(() => {
    const getData = async () => {
      const url = 'api/useractivities/getrecords';
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const records = (await response.json()) as UserActivityRecord[];
        setValue('records', records);
      }
    };

    getData();
  }, [setValue]);

  return (
    <div className="user-activity">
      <h1 className="user-activity__title">USER ACTIVITY</h1>
      <div className="user-activity__headers">
        <span className="user-activity__header-user">User ID</span>
        <span className="user-activity__header-date">Registration date</span>
        <span className="user-activity__header-date">Last activity date</span>
      </div>
      <div className="user-activity-form">
        <form onSubmit={handleSubmit(sendData)}>
          {fields.map((field, index) => {
            return (
              <div key={field.id}>
                <div className="input-group">
                  <input
                    {...register(`records.${index}.userId` as const)}
                    className="user-activity-form__user-input"
                  />
                  <input
                    {...register(`records.${index}.dateRegistration` as const)}
                    className="user-activity-form__date-input"
                  />
                  <input
                    {...register(`records.${index}.dateLastActivity` as const)}
                    className="user-activity-form__date-input"
                  />
                  <button
                    type="button"
                    className="user-activity-form__remove-button"
                    onClick={() => remove(index)}
                  ></button>
                </div>
                <div className="input-group__errors">
                  {errors?.records?.[index]?.userId && (
                    <p>{errors?.records?.[index]?.userId?.message}</p>
                  )}
                  {errors?.records?.[index]?.dateRegistration && (
                    <p>{errors?.records?.[index]?.dateRegistration?.message}</p>
                  )}
                  {errors?.records?.[index]?.dateLastActivity && (
                    <p>{errors?.records?.[index]?.dateLastActivity?.message}</p>
                  )}
                </div>
              </div>
            );
          })}
          <button
            type="button"
            className="user-activity-form__new-button"
            onClick={() =>
              append({
                userId: undefined,
                dateRegistration: undefined,
                dateLastActivity: undefined,
              })
            }
          ></button>
          <div className="user-activity-form__save-button-content">
            <button type="submit" className="user-activity-form__save-button">
              SAVE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserActivityInput;
