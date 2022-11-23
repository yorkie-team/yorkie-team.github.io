import { Alert } from './Alert';

export function Blockquote(props: any) {
  return <Alert status="info">{props.children}</Alert>;
}
