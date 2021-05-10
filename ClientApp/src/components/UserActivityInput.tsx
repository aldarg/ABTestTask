import React, { useState } from 'react';
import { UserActivityRecord } from '../types';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import classnames from 'classnames';
import { useForm, useFieldArray } from 'react-hook-form';

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

type FormValues = {
  records: {
    user: number;
    dateRegistration: Date;
    dateLastActivity: Date;
  }[];
};

const exactFormatOfDateCheck = {
  name: 'dateFormatCheck',
  exclusive: false,
  message: 'Format of date should be DD.MM.YYYY',
  test: (value: Date | undefined) =>
    value || (value as string).search(/\d{2}\.\d{2}\.\d{4}/gm) >= 0,
};

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
          .date()
          .typeError('Registration date - not a date')
          .test(exactFormatOfDateCheck)
          .required('Registration date is required'),
        dateLastActivity: yup
          .date()
          .typeError('Last activity date - not a date')
          .required('Last activity date is required')
          .min(
            yup.ref('dateRegistration'),
            "Can't be earlier than the date of registration",
          ),
      }),
    ),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      records: [
        {
          user: undefined,
          dateRegistration: undefined,
          dateLastActivity: undefined,
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

  return (
    <div className="user-activity">
      <div className="user-activity__headers">
        <span className="user-activity__header-user">User ID</span>
        <span className="user-activity__header-date">Registration date</span>
        <span className="user-activity__header-date">Last activity date</span>
      </div>
      <div className="user-activity-form">
        <form onSubmit={handleSubmit(fetchData)}>
          {fields.map((field, index) => {
            return (
              <div key={field.id}>
                <div className="input-group">
                  <input
                    {...register(`records.${index}.user` as const)}
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
                  {errors?.records?.[index]?.user && (
                    <p>{errors?.records?.[index]?.user?.message}</p>
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
                user: undefined,
                dateRegistration: undefined,
                dateLastActivity: undefined,
              })
            }
          ></button>
          <div className="user-activity-form__save-button-content">
            <button type="submit" className="user-activity-form__save-button">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserActivityInput;
