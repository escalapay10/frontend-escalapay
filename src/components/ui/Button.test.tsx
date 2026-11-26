import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renderiza el texto y ejecuta onClick', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Confirmar</Button>);

    await user.click(screen.getByRole('button', { name: 'Confirmar' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('queda deshabilitado mientras tiene loading', () => {
    render(<Button loading>Guardando</Button>);

    const button = screen.getByRole('button', { name: /guardando/i });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
  });

  it('respeta disabled sin loading', () => {
    render(
      <Button disabled variant="secondary">
        Sin saldo
      </Button>,
    );

    expect(screen.getByRole('button', { name: 'Sin saldo' })).toBeDisabled();
  });
});
