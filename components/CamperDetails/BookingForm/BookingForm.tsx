"use client";

import { BookingDraft, useBookingStore } from "@/stores/bookingStore";
import css from "./BookingForm.module.css";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { Button } from "@/components/UI/Button/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const BookingFormSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(40, "Name is too long")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  date: Yup.string().required("Booking date is required"),
  comment: Yup.string().max(500, "Comment is too long"),
});

export default function BookingForm() {
  const { draft, setDraft, clearDraft } = useBookingStore();
  const [errors, setErrors] = useState<
    Partial<Record<keyof BookingDraft, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setDraft({ [name]: value });

    try {
      await BookingFormSchema.validateAt(name, {
        ...draft,
        [name]: value,
      });
      setErrors((prev) => ({ ...prev, [name]: "" }));
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        setErrors((prev) => ({ ...prev, [name]: err.message }));
      }
    }
  };

  const handleDateChange = async (date: Date | null) => {
    const value = date ? date.toISOString() : "";
    setDraft({ date: value });

    try {
      await BookingFormSchema.validateAt("date", {
        ...draft,
        date: value,
      });
      setErrors((prev) => ({ ...prev, date: "" }));
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        setErrors((prev) => ({ ...prev, date: err.message }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await BookingFormSchema.validate(draft, { abortEarly: false });
      setErrors({});
      setIsSubmitting(true);

      await new Promise((r) => setTimeout(r, 300));

      toast.success("Booking successful!");
      clearDraft();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const newErrors: Partial<Record<keyof BookingDraft, string>> = {};
        err.inner.forEach((e) => {
          if (e.path) newErrors[e.path as keyof BookingDraft] = e.message;
        });
        setErrors(newErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isHydrated) return null;

  return (
    <div className={css.formWrapper}>
      <h3 className={css.title}>Book your campervan now</h3>
      <p className={css.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <form className={css.form} onSubmit={handleSubmit} noValidate>
        <div className={css.inputsWrapper}>
          <label htmlFor="name" className={css.visuallyHidden}>
            Name
          </label>
          <input
            id="name"
            name="name"
            placeholder="Name*"
            value={draft.name || ""}
            onChange={handleChange}
            className={`${css.input} ${errors.name ? css.error : ""}`}
          />
          {errors.name && <span className={css.errorText}>{errors.name}</span>}

          <label htmlFor="email" className={css.visuallyHidden}>
            Email
          </label>
          <input
            id="email"
            name="email"
            placeholder="Email*"
            value={draft.email || ""}
            onChange={handleChange}
            className={`${css.input} ${errors.email ? css.error : ""}`}
          />
          {errors.email && (
            <span className={css.errorText}>{errors.email}</span>
          )}

          <div className={css.datePickerContainer}>
            <DatePicker
              selected={draft.date ? new Date(draft.date) : null}
              onChange={handleDateChange}
              placeholderText="Booking date*"
              dateFormat="dd.MM.yyyy"
              minDate={new Date()}
              className={`${css.input} ${errors.date ? css.error : ""}`}
              calendarClassName={css.calendar}
              popperPlacement="bottom"
            />
          </div>
          {errors.date && <span className={css.errorText}>{errors.date}</span>}

          <label htmlFor="comment" className={css.visuallyHidden}>
            Comment
          </label>
          <textarea
            id="comment"
            name="comment"
            placeholder="Comment"
            value={draft.comment || ""}
            onChange={handleChange}
            className={css.textarea}
          />
        </div>

        <div className={css.submitWrap}>
          <Button className={css.submit} type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send"}
          </Button>
        </div>
      </form>
    </div>
  );
}
