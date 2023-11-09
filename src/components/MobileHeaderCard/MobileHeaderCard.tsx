import { FC, ReactNode } from 'react';
import { Card, CardHeader, CardBody } from '@nextui-org/card';
import { Avatar } from '@nextui-org/avatar';
import { getClassName } from 'src/utils';

export interface MobileHeaderProps {
  title: string | null;
  photoURL?: string | null;
  childrenCardHeader?: ReactNode;
  childrenCardBody?: ReactNode;
  children?: ReactNode;
  classNames?: {
    card?: string;
    wrapperSection?: string;
    wrapper?: string;
    header?: string;
    body?: string;
  };
  mediaQuery: 'sm' | 'lg';
}

// На тот случай если нету photoURL
const WithAvatar: FC<Pick<MobileHeaderProps, 'photoURL'>> = ({ photoURL }) => {
  return (
    <>
      {photoURL ? (
        <Avatar
          className="-mt-11 h-16 w-16 self-center text-large"
          src={photoURL}
        />
      ) : (
        <Avatar className="-mt-11 h-16 w-16 self-center text-large" />
      )}
    </>
  );
};

const mediaQueryClasses = {
  sm: {
    card: 'sm:rounded-large sm:bg-content1 sm:shadow-medium',
    cardBody: 'sm:mt-0 sm:rounded-none sm:bg-content1',
  },
  lg: {
    card: 'lg:rounded-large lg:bg-content1 lg:shadow-medium',
    cardBody: 'lg:mt-0 lg:rounded-none lg:bg-content1',
  },
};

const MobileHeaderCard: FC<MobileHeaderProps> = ({
  title,
  photoURL,
  classNames,
  childrenCardHeader,
  childrenCardBody,
  children,
  mediaQuery,
}) => {
  const cardMediaQuery = mediaQueryClasses[mediaQuery].card;
  const cardBodyMediaQuery = mediaQueryClasses[mediaQuery].cardBody;

  const card = getClassName(classNames?.card);
  const wrapperSection = getClassName(classNames?.wrapperSection);
  const wrapper = getClassName(classNames?.wrapper);
  const header = getClassName(classNames?.header);
  const body = getClassName(classNames?.body);

  return (
    <section slot="wrapperSection" className={wrapperSection}>
      <Card
        slot="card"
        className={`w-full rounded-none bg-transparent shadow-none ${cardMediaQuery} ${card}`}
      >
        <div slot="wrapper" className={wrapper}>
          <CardHeader
            slot="header"
            className={`flex h-20 items-start justify-end rounded-none bg-gradient-to-r from-pink-500 to-indigo-500 ${header}`}
          >
            {childrenCardHeader}
          </CardHeader>
          <CardBody
            slot="body"
            className={`-mt-5 flex items-center gap-2 overflow-visible rounded-t-3xl bg-background ${cardBodyMediaQuery} ${body}`}
          >
            <WithAvatar photoURL={photoURL} />
            <h6 className="text-xl">{title}</h6>
            {childrenCardBody}
          </CardBody>
        </div>
        {children}
      </Card>
    </section>
  );
};

export default MobileHeaderCard;
