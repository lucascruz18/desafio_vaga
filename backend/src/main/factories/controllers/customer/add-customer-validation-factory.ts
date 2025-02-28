import { RequiredFieldValidation, ValidationComposite } from '../../../../validation/validators'
import { Validation } from '../../../../presentation/protocols'

export const makeAddCustomerValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'cpfCnpj']) {
    validations.push(new RequiredFieldValidation(field))
  }

  return new ValidationComposite(validations)
}
