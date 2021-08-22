import {render, screen} from '@testing-library/react'

import PaginationButtons from './PaginationButtons'

describe('PaginationButtons component', () => {
  test('Next button fires callback on click', () => {
    render(<PaginationButtons  />);

    const test;
    expect(test).not.toBeInTheDocument()
  })
})