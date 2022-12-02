import { ReactNode } from 'react';
import { Caption } from './Caption';
import { Image } from '../Image';

export function ImageWrap({ children }: { children: ReactNode }) {
  return <div className="img_wrap">{children}</div>;
}

function Box({ children }: { children: ReactNode }) {
  return <div className="img_box">{children}</div>;
}

ImageWrap.Box = Box;
ImageWrap.Caption = Caption;
ImageWrap.Image = Image;
