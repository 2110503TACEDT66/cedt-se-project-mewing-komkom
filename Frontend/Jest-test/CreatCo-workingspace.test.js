import React from 'react';
import { render, fireEvent, getByRole } from '@testing-library/react';
import CoWorkForm from '../src/components/admin/CreatCoWorkForm'; 
import { useSession } from 'next-auth/react';
import { useCardContext } from "../src/context/CardContext";
import createCoWorkingSpace from "@/libs/createWorkingSpace";

jest.mock('../src/context/CardContext.tsx'); 
jest.mock('next-auth/react');
jest.mock('../src/libs/createWorkingSpace'); // Mock createCoWorkingSpace

test('CoWorkForm renders and submits data correctly', async () => {
  const mockSession = { data: { user: { token: 'mock-token' } } };
  useSession.mockReturnValue({ data: mockSession });

  const mockCardContext = {
    handleFormChange: jest.fn(),
    handleOpenChange: jest.fn(),
    handleCloseChange: jest.fn(),
    amount: 0, 
    inputValue: '', 
    isValid: true, 
    card: {
      name: '',
      address: '',
      openTime: '',
      closeTime: '',
      maxSeat: 0,
      image: '',
    },
  };

  useCardContext.mockReturnValue(mockCardContext);

  const { getByTestId, getByText, getByLabelText, getByRole } = render(<CoWorkForm />);

  const nameInput = getByLabelText('ชื่อ:');
  const addressInput = getByLabelText('รายละเอียด:');
  const maxSeatInput = getByLabelText('จำนวนที่นั่ง:');
  const openTimePicker = getByTestId('openTime');
  const closeTimePicker = getByTestId('closeTime');
  const submitButton = getByRole('button', { type: 'submit' });


  // Simulate user input
  fireEvent.change(nameInput, { target: { value: 'My Co-working Space' } });
  fireEvent.change(addressInput, { target: { value: '123 Main Street' } });
  fireEvent.change(maxSeatInput, { target: { value: 10 } });

  // Simulate TimePicker selection (replace with specific times if needed)
  fireEvent.change(openTimePicker, { target: { value: '09:00' } });
  fireEvent.change(closeTimePicker, { target: { value: '18:00' } });

  // Submit the form
  fireEvent.submit(submitButton);

  // Assert expected behavior
  expect(mockCardContext.handleFormChange).toHaveBeenCalledTimes(5); // 5 calls for name, address, maxSeat, openTime, closeTime
  expect(mockCardContext.handleOpenChange).toHaveBeenCalledTimes(1);
  expect(mockCardContext.handleCloseChange).toHaveBeenCalledTimes(1);
  expect(createCoWorkingSpace).toHaveBeenCalledWith(
    expect.objectContaining({
      name: 'My Co-working Space',
      address: '123 Main Street',
      maxSeat: 10,
      openTime: '09:00',
      closeTime: '18:00',
    }),
    mockSession.data.user.token
  );
});
