import React from 'react'
import styled from 'styled-components'

import Container from '../Container'
import Mask from '../Mask'
import styles from '../../styles'
import useFetch from '../../hooks/useFetch'

import AlfredButton from './AlfredButton'
import AlfredEmpty from './AlfredEmpty'
import AlfredInput from './AlfredInput'
import AlfredResult from './AlfredResult'

const StyledWrap = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  padding: ${styles.getGap(2)} 0;
`

const Alfred = ({ button, service = () => {}, children }) => {
  const [show, setShow] = React.useState(false)
  const [keyword, setKeyword] = React.useState('')

  const [{ loading, loaded, data }, search] = useFetch(service, 2000)

  return (
    <>
      {React.isValidElement(button) ? (
        React.cloneElement(button, {
          onClick: () => setShow(true),
        })
      ) : (
        <AlfredButton {...(button || {})} onClick={() => setShow(true)} />
      )}
      <Mask
        show={show}
        onClose={() => setShow(false)}
        style={{ justifyContent: 'center' }}
      >
        <StyledWrap>
          <Container column={true}>
            <Container.Item flex="0 0 auto">
              <AlfredInput
                value={keyword}
                loading={loading}
                onChange={setKeyword}
                onSearch={() => !loading && keyword && search(keyword)}
              />
            </Container.Item>
            {!loading && !!data.list?.length && (
              <Container.Item fixed={true}>
                <AlfredResult
                  loading={loading}
                  loaded={loaded}
                  list={data.list}
                  pagination={data.pagination}
                  onPageChange={(current) => search(keyword, current)}
                  onClose={() => setShow(false)}
                >
                  {children}
                </AlfredResult>
              </Container.Item>
            )}
            {loaded && !data.list?.length && (
              <Container.Item flex="0 0 auto">
                <AlfredEmpty />
              </Container.Item>
            )}
          </Container>
        </StyledWrap>
      </Mask>
    </>
  )
}

export default Alfred
