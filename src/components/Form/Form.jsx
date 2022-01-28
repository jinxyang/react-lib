import React from 'react'
import styled from 'styled-components'
import { get } from 'lodash'

import { useConfig } from '../Provider'

import Container from '../Container'
import withForm from './withForm'
import builtInComponents from './components'

const StyledFooter = styled.div`
  margin-left: ${({ theme, $labelWidth }) =>
    $labelWidth ? theme.gapString : 0};
  padding-left: ${({ $labelWidth }) => $labelWidth};
`

const Form = (
  {
    name = '',
    autoComplete = 'new-password',
    mode = 'grid',
    components = {},
    fields = [],
    values = {},
    showError = false,
    flex = '0 0 auto',
    wrap = false,
    span = 12,
    sm = 0,
    md = 0,
    lg = 0,
    xl = 0,
    xxl = 0,
    labelInline = true,
    labelWidth = '70px',
    labelLeft = false,
    hideLabel = false,
    gap = '24px',
    onChange = () => {},
    onSubmit = () => {},
    onError = () => {},
    wrapper = withForm,
    children,
  },
  ref,
) => {
  const { formComponents } = useConfig()

  const allComponents = React.useMemo(() => {
    return { ...builtInComponents, ...formComponents, ...components }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const inputs = React.useMemo(() => {
    const result = {}
    Object.keys(allComponents).forEach((type) => {
      result[type] = wrapper(allComponents[type])
    })
    return result
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const containerSpans = React.useMemo(
    () => ({
      span,
      sm,
      md,
      lg,
      xl,
      xxl,
    }),
    [lg, md, sm, span, xl, xxl],
  )
  const [errors, setErrors] = React.useState({})
  const errorMessage = React.useMemo(() => {
    const errorField = fields.find(({ key }) => errors[key])
    return errorField ? errors[errorField.key] : ''
  }, [errors, fields])

  const handleChange = React.useCallback(
    (key, value) => {
      onChange({ ...values, [key]: value })
    },
    [onChange, values],
  )

  const handleSubmit = React.useCallback(
    (e) => {
      e.preventDefault()
      onSubmit(errorMessage)
    },
    [onSubmit, errorMessage],
  )

  const handleError = React.useCallback((key, message) => {
    setErrors((errors) => {
      if (message === errors[key]) {
        return errors
      }
      return { ...errors, [key]: message }
    })
  }, [])

  React.useEffect(() => {
    onError(errorMessage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessage])

  return (
    <form
      ref={ref}
      name={name}
      autoComplete={autoComplete}
      onSubmit={handleSubmit}
    >
      <Container mode="flex" column={true} gap={gap}>
        <Container.Item>
          <Container mode={mode} gap={gap} wrap={wrap}>
            {fields.map(
              ({
                type,
                key,
                label,
                rules = [],
                span = containerSpans.span,
                sm = containerSpans.sm,
                md = containerSpans.md,
                lg = containerSpans.lg,
                xl = containerSpans.xl,
                xxl = containerSpans.xxl,
                validator,
                props = {},
              }) => {
                const InputComponent = inputs[type]
                if (!InputComponent) return null
                return (
                  <Container.Item
                    flex={flex}
                    span={span}
                    sm={sm}
                    md={md}
                    lg={lg}
                    xl={xl}
                    xxl={xxl}
                    key={key}
                  >
                    <InputComponent
                      name={key}
                      value={get(values, key)}
                      label={label}
                      rules={rules}
                      showError={showError}
                      labelInline={labelInline}
                      labelWidth={labelWidth}
                      labelLeft={labelLeft}
                      hideLabel={hideLabel}
                      validator={validator}
                      {...(typeof props === 'function' ? props(values) : props)}
                      onChange={(value) => handleChange(key, value)}
                      onError={(message) => handleError(key, message)}
                    />
                  </Container.Item>
                )
              },
            )}
            {mode === 'flex' && <Container.Item>{children}</Container.Item>}
          </Container>
        </Container.Item>
        {mode !== 'flex' && (
          <Container.Item>
            <StyledFooter
              $labelWidth={hideLabel || !labelInline ? 0 : labelWidth}
            >
              {children}
            </StyledFooter>
          </Container.Item>
        )}
      </Container>
    </form>
  )
}

export default React.forwardRef(Form)
