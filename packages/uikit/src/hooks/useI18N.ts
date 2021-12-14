import { useMemo } from "react";
import { Namespace, useTranslation } from "react-i18next";
import { useDateFormat } from "./useDateFormat";
import { useNumberFormat } from "./useNumberFormat";

export const useI18N = <N extends Namespace<string> = "translation">(namespace?: N) => {
  const i18nInfo = useTranslation(namespace);

  const currentLocale = useMemo(() => i18nInfo.i18n.language, [i18nInfo.i18n.language]);

  const numberFormat = useNumberFormat(currentLocale);

  const dateFormat = useDateFormat(currentLocale);

  return {
    ...i18nInfo,
    ...numberFormat,
    ...dateFormat,
    currentLocale,
  };
};
