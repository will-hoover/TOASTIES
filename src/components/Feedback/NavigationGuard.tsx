'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface NavigationGuardProps {
  isDirty: boolean;
  message?: string;
}

const NavigationGuard = ({
  isDirty,
  message = 'You have unsaved changes. Are you sure you want to leave?',
}: NavigationGuardProps) => {
  const router = useRouter();

  useEffect(() => {
    if (!isDirty) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = message;
      return message;
    };

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a');

      if (!anchor) return;

      const href = anchor.getAttribute('href');
      const isSamePageAnchor = href?.startsWith('#');

      if (!isSamePageAnchor && anchor.target !== '_blank') {
        const confirmLeave = window.confirm(message);
        if (!confirmLeave) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    };

    const handlePopState = () => {
      const confirmLeave = window.confirm(message);
      if (!confirmLeave) {
        window.history.pushState(null, '', window.location.href);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('click', handleAnchorClick, true);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('click', handleAnchorClick, true);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isDirty, message]);

  return null;
};

export default NavigationGuard;