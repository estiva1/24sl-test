import clsx from 'clsx';
import { useState, ButtonHTMLAttributes } from 'react';
import { CenteredLayout } from '~/components';

// TODO is there a way to not write this twice? =\
// type ButtonType = 'fast' | 'quality' | 'cheap';

// const buttons: ButtonType[] = ['fast', 'quality', 'cheap'];

enum BUTTON_TYPES {
  fast = "fast",
  quality = "quality",
  cheap = "cheap",
} 

interface ButtonProps {
  button: BUTTON_TYPES;
  selectedButton: BUTTON_TYPES | null;
  setSelectedButton: (value: BUTTON_TYPES) => void;
} 

// TODO is it possible to improve this component's interface (props)?
const Button = ({ button, selectedButton, setSelectedButton }: ButtonProps) => {
  const style = button === selectedButton;
  return (
    <button
      key={button}
      onClick={() => setSelectedButton(button)}
      className={clsx(
        'h-10 px-5 flex items-center justify-center rounded transition-colors',
        style ? 'bg-green-400' : 'bg-gray-300',
      )}
    >
      {button}
    </button>
  );
};

export const Refactor1 = () => {
  const [selectedButton, setSelectedButton] = useState<BUTTON_TYPES | null>(null);
  return (
    <CenteredLayout className="gap-4">
      <div className="text-3xl">See the code</div>
      <div className="grid grid-cols-3 gap-2 w-60">
        {(Object.keys(BUTTON_TYPES) as Array<keyof typeof BUTTON_TYPES>).map((button) => (
          <Button
            key={button}
            button={button}
            selectedButton={selectedButton}
            setSelectedButton={setSelectedButton}
          />
        ))}
      </div>
    </CenteredLayout>
  );
};
