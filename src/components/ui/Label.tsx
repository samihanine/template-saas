import { classNames } from '@/utils/styling';

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label: React.FC<LabelProps> = (props) => (
  <label {...props} className={classNames('block text-sm font-medium text-gray-700', props.className)} />
);
