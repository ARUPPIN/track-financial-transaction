import React from 'react'
import { camelCaseToTitle } from '../../common/utils'
export const FormErrors = ({ formErrors }) => (
  <div className='formErrors'>
    {Object.keys(formErrors).map((fieldName, i) => {
      if (formErrors[fieldName].length > 0) {
        return (
          <p key={i} align='center' style={{ color: 'red' }}>
            {camelCaseToTitle(fieldName)} {formErrors[fieldName]}
          </p>
        )
      } else {
        return ''
      }
    })}
  </div>
)
