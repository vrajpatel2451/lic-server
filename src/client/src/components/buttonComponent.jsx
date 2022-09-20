import React from 'react';
import cn from 'classnames';

function ButtonComponent({
  buttonText = 'Button',
  appearance = 'pri',
  icon,
  buttonClass,
  ...props
}) {
  return (
    <button
      {...props}
      className={cn('px-5 py-2 rounded-md', {
        'flex items-center justify-center gap-2': icon,

        'bg-pri hover:bg-pri-light text-white hover:text-pri-dark font-semibold transition-all':
          appearance === 'pri',
        'border-pri border text-pri hover:bg-pri-light hover:border-pri-light hover:text-pri-dark transition-all ':
          appearance === 'pri-out',

        'bg-sec hover:bg-sec-light text-white transition-all': appearance === 'sec',
        'border-sec border text-sec hover:bg-sec-light hover:border-sec-light hover:text-pri-dark transition-all ':
          appearance === 'sec-out',

        'bg-gray text-white cursor-not-allowed': appearance === 'disabled',

        [buttonClass]: !!buttonClass,
      })}
    >
      {icon}
      {buttonText}
    </button>
  );
}

export default ButtonComponent;
