import React, { useEffect, useState } from 'react';
import { UserActivityRecord } from '../types/app';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useFieldArray } from 'react-hook-form';
import { DateTime } from 'luxon';
import classnames from 'classnames';

const mapToDto = (records: UserActivityRecord[]) => {
  return records.map(({ userId, dateRegistration, dateLastActivity }) => ({
    userId,
    dateRegistration: DateTime.fromFormat(
      dateRegistration as string,
      'dd.MM.yyyy',
    ),
    dateLastActivity: DateTime.fromFormat(
      dateLastActivity as string,
      'dd.MM.yyyy',
    ),
  }));
};

const mapFromDto = (dtos: UserActivityRecord[]) => {
  return dtos.map(({ userId, dateRegistration, dateLastActivity }) => ({
    userId,
    dateRegistration: DateTime.fromISO(dateRegistration as string).toFormat(
      'dd.MM.yyyy',
    ),
    dateLastActivity: DateTime.fromISO(dateLastActivity as string).toFormat(
      'dd.MM.yyyy',
    ),
  }));
};

type FormValues = {
  records: UserActivityRecord[];
};

const UserActivityInput: React.FC = () => {
  const [isSaveError, setSaveError] = useState(false);

  const validationSchema = yup.object().shape({
    records: yup.array().of(
      yup.object().shape({
        userId: yup
          .number()
          .typeError('User ID should be a number')
          .positive("User ID can't be negative")
          .integer('User ID should be an integer')
          .required('User ID is required'),
        dateRegistration: yup
          .string()
          .required('Registration date is required')
          .test(
            'dateFormat',
            'Registration date - invalid format. Should be [dd.mm.yyyy]',
            (value: string) => {
              const date = DateTime.fromFormat(value, 'dd.MM.yyyy');
              return date.isValid;
            },
          ),
        dateLastActivity: yup
          .string()
          .required('Last activity date is required')
          .test(
            'dateFormat',
            'Last activity date - invalid format. Should be [dd.mm.yyyy]',
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
    getValues,
    trigger,
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
        setValue('records', mapFromDto(records));
      }
    };

    getData();
  }, [setValue]);

  const sendData = async ({ records }: { records: UserActivityRecord[] }) => {
    setSaveError(false);
    const url = 'api/useractivities/save';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mapToDto(records)),
      });

      if (response.ok) {
        console.log('saved');
      } else {
        if (response.status === 400) {
          trigger();
        }
      }
    } catch {
      setSaveError(true);
    }
  };

  const isNoData = !getValues().records?.[0].userId;

  return (
    <div className="user-activity">
      <h1 className="user-activity__title">USER ACTIVITY</h1>
      {isSaveError && (
        <div>Something went completly wrong - data is not saved.</div>
      )}
      <div className="user-activity__headers">
        <span className="user-activity__header-user">User ID</span>
        <span className="user-activity__header-date">Registration date</span>
        <span className="user-activity__header-date">Last activity date</span>
      </div>
      <div className="user-activity-form">
        <form onSubmit={handleSubmit(sendData)}>
          {fields.map((field, index) => {
            console.log(errors?.records?.[index]?.userId);
            return (
              <div key={field.id}>
                <div className="input-group">
                  <input
                    {...register(`records.${index}.userId` as const)}
                    className={classnames('user-activity-form__user-input', {
                      invalid: !!errors?.records?.[index]?.userId,
                    })}
                  />
                  <input
                    {...register(`records.${index}.dateRegistration` as const)}
                    className={classnames('user-activity-form__date-input', {
                      invalid: !!errors?.records?.[index]?.dateRegistration,
                    })}
                  />
                  <input
                    {...register(`records.${index}.dateLastActivity` as const)}
                    className={classnames('user-activity-form__date-input', {
                      invalid: !!errors?.records?.[index]?.dateLastActivity,
                    })}
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
            <button
              type="submit"
              disabled={!!isNoData}
              className="user-activity-form__save-button"
            >
              SAVE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserActivityInput;
