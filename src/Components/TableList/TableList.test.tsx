
import {describe, expect, test} from '@jest/globals';
import TableList from './TableList';

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'


test('loads and displays table', async () => {
  // ARRANGE
    const getData = async () => new Promise<string[]> (resolve => setTimeout (() => resolve (['iid','iid','iid','iid','iid']), 1000));
  const data = await getData ();
  render(<TableList data={data}  />)

  // ACTscreen.queryByText().
  //await userEvent.type().click(screen.getByText('Load Greeting'))
  await screen.getByText(data[0])

  // ASSERT
  expect( screen.getByText(data[0]).textContent?.includes(data[0]) === true)
  //expect(screen.getByRole('button')).toBeDisabled()
})