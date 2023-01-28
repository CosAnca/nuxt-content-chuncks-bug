import { computed } from "vue";
import type { Ref } from "vue";
import classNames from "classnames";
import type { AlertType } from "../types";

const defaultAlertClasses = "p-4 text-sm border rounded-md";

const alertTextClasses: Record<AlertType, string> = {
  danger: "text-red-700 dark:text-red-800",
  dark: "text-gray-700 dark:text-gray-300",
  info: "text-blue-700 dark:text-blue-800",
  success: "text-green-700 dark:text-green-800",
  warning: "text-yellow-700 dark:text-yellow-800",
};

const alertTypeClasses: Record<AlertType, string> = {
  danger: "bg-red-100 dark:bg-red-200 border-red-300 dark:border-red-400",
  dark: "bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-800",
  info: "bg-blue-100 dark:bg-blue-200 border-blue-300 dark:border-blue-400",
  success:
    "bg-green-100 dark:bg-green-200 border-green-300 dark:border-green-400",
  warning:
    "bg-yellow-100 dark:bg-yellow-200 border-yellow-300 dark:border-yellow-400",
};

const defaultCloseButtonClasses =
  "ml-auto -mx-1.5 -my-1.5 rounded focus:outline-none p-1.5 inline-flex h-8 w-8";

const closeButtonClasses: Record<AlertType, string> = {
  danger:
    "hover:bg-red-200 dark:hover:bg-red-300 focus-visible:outline-red-400 bg-red-100 dark:bg-red-200 text-red-500",
  dark: "dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white hover:bg-gray-200 focus-visible:outline-gray-400 bg-gray-100 text-gray-500",
  info: "hover:bg-blue-200 dark:hover:bg-blue-300 focus-visible:outline-blue-400 bg-blue-100 dark:bg-blue-200 text-blue-500",
  success:
    "bg-green-100 dark:bg-green-200 text-green-500 focus-visible:outline-green-400 hover:bg-green-200 dark:hover:bg-green-300",
  warning:
    "focus-visible:outline-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-300 bg-yellow-100 dark:bg-yellow-200 text-yellow-600",
};

export type UseAlertClassesProps = {
  type: Ref<AlertType>;
  icon: Ref<boolean>;
  inline: Ref<boolean>;
  title: Ref<string>;
};

export function useAlertClasses(props: UseAlertClassesProps): {
  alertClasses: Ref<string>;
  textClasses: Ref<string>;
  closeClasses: Ref<string>;
  contentClasses: Ref<string>;
  titleClasses: Ref<string>;
} {
  const alertClasses = computed<string>(() => {
    return classNames(
      defaultAlertClasses,
      alertTypeClasses[props.type.value],
      textClasses.value,
      props.inline.value ? "flex" : ""
    );
  });

  const textClasses = computed<string>(() => {
    return classNames(alertTextClasses[props.type.value]);
  });

  const closeClasses = computed<string>(() => {
    return classNames(
      defaultCloseButtonClasses,
      closeButtonClasses[props.type.value]
    );
  });

  const contentClasses = computed<string>(() => {
    if (!props.inline.value) return classNames("mt-2 mb-4");
    if (!props.icon.value && !props.title.value) return "";

    // eslint-disable-next-line tailwindcss/no-custom-classname
    return classNames(!props.title.value ? "break-word ml-3" : "ml-1");
  });

  const titleClasses = computed<string>(() => {
    if (!props.icon.value || !props.inline.value)
      return classNames(
        "font-medium",
        !props.inline.value ? "ml-2 text-lg" : ""
      );

    return classNames("ml-3 font-medium", !props.inline.value ? "text-lg" : "");
  });

  return {
    alertClasses,
    textClasses,
    closeClasses,
    contentClasses,
    titleClasses,
  };
}
