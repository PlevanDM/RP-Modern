import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { WorkExperienceSection } from './WorkExperience';
import { WorkExperience } from '../../../types/models';

const mockExperience: WorkExperience[] = [
  {
    id: '1',
    company: 'Tech Corp',
    role: 'Frontend Developer',
    startDate: '2020',
    endDate: '2022',
    description: 'Developed and maintained web applications.',
  },
];

describe('WorkExperienceSection', () => {
  it('renders the component with initial experience', () => {
    render(
      <WorkExperienceSection
        experience={mockExperience}
        isEditing={false}
        onExperienceChange={() => {}}
      />
    );

    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
  });

  it('allows adding a new work experience entry', () => {
    const onExperienceChange = jest.fn();
    render(
      <WorkExperienceSection
        experience={[]}
        isEditing={true}
        onExperienceChange={onExperienceChange}
      />
    );

    fireEvent.click(screen.getByText('Додати'));

    fireEvent.change(screen.getByPlaceholderText('Посада'), { target: { value: 'New Role' } });
    fireEvent.change(screen.getByPlaceholderText('Компанія'), { target: { value: 'New Company' } });
    fireEvent.click(screen.getByText('Зберегти'));

    expect(onExperienceChange).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ role: 'New Role', company: 'New Company' }),
      ])
    );
  });

  it('allows editing an existing work experience entry', () => {
    const onExperienceChange = jest.fn();
    render(
      <WorkExperienceSection
        experience={mockExperience}
        isEditing={true}
        onExperienceChange={onExperienceChange}
      />
    );

    fireEvent.click(screen.getByTestId('edit-button-1'));

    fireEvent.change(screen.getByPlaceholderText('Посада'), { target: { value: 'Updated Role' } });
    fireEvent.click(screen.getByText('Зберегти'));

    expect(onExperienceChange).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ role: 'Updated Role' }),
      ])
    );
  });

  it('allows deleting a work experience entry', () => {
    const onExperienceChange = jest.fn();
    render(
      <WorkExperienceSection
        experience={mockExperience}
        isEditing={true}
        onExperienceChange={onExperienceChange}
      />
    );

    fireEvent.click(screen.getByTestId('delete-button-1'));

    expect(onExperienceChange).toHaveBeenCalledWith([]);
  });
});
