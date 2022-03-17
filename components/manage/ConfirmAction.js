import { React } from "react";
import ErrorMessage from "../ErrorMessage";
import { Input } from "../Input";

function ConfirmAction({ handleChange }) {
  const error = "";
  const message = "";
  return (
    <>
      <input type="checkbox" id="confirm-action" class="modal-toggle" />
      <label for="confirm-action" class="modal cursor-pointer">
        <label class="modal-box relative" for="">
          <div className="flex flex-col justify-around pb-4 space-y-2">
            <span className="text-lg font-bold">
              Confirm your password to continue.
            </span>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="password"
              required
              placeholder="Password"
              onChange={handleChange}
            />
            <ErrorMessage
              hasError={error}
              isInformation={error}
              text={error ? `Error: ${message}` : ""}
            />
          </div>
        </label>
      </label>
    </>
  );
}

export default ConfirmAction;
