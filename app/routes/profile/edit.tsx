import type { ActionFunction, LinksFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useTransition } from "@remix-run/react";
import bcrypt from "bcryptjs";
import _ from "lodash";
import { useEffect, useState } from "react";
import type { z } from "zod";
import AppLayout from "~/components/AppLayout";
import ActionButton from "~/components/buttons/ActionButton";
import FormCheckbox from "~/components/form/FormCheckbox";
import FormInput from "~/components/form/FormInput";
import FormRadioGroup from "~/components/form/FormRadioGroup";
import FormTabs from "~/components/form/FormTabs";
import FormTextarea from "~/components/form/FormTextarea";
import type { profileDataT } from "~/DAO/profileDAO.server";
import { getProfile, updateProfile } from "~/DAO/profileDAO.server";
import { updateUserPassword } from "~/DAO/userDAO.server";
import styles from "~/styles/form.css";
import { login, logout, requireUser } from "~/utils/session.server";
import type { FormValidationT } from "~/validations/formValidation.server";
import { validateFormData } from "~/validations/formValidation.server";
import { profileSchema } from "~/validations/schemas/profileSchema.server";
import { editPasswordSchema } from "~/validations/schemas/userSchema.server";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

type Schema1T = z.infer<typeof profileSchema>;
type Schema2T = z.infer<typeof editPasswordSchema>;

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const body = Object.fromEntries(formData);

  if (body["_action"] === "updateProfile") {
    const form = validateFormData<Schema1T>(body, profileSchema);
    if (!_.isEmpty(form.errors) || form.data === null) {
      return json(form, { status: 400 });
    }

    const data: profileDataT = {
      user_id: parseInt(form.data.userId),
      fullname: form.data.fullname,
      email: form.data.email,
      gender: form.data.gender === "MALE" ? "M" : form.data.gender === "FEMALE" ? "F" : undefined,
      phone: form.data.phone,
      info: form.data.info,
      is_public: form.data.isPublic === "on" ? true : false,
      updated_at: new Date().toISOString(),
    };
    await updateProfile(data);
  }
  if (body["_action"] === "updatePassword") {
    const form = validateFormData<Schema2T>(body, editPasswordSchema);
    if (!_.isEmpty(form.errors) || form.data === null) {
      return json(form, { status: 400 });
    }

    const user = await login({ username: form.data.username, password: form.data.oldPassword });
    if (!user) {
      return json({ ...form, authError: "Invalid credentials" }, { status: 400 });
    }
    await updateUserPassword(form.data.username, await bcrypt.hash(form.data.newPassword, 10));
  }

  return redirect("/profile");
};

type LoaderDataT = {
  profile: Exclude<Awaited<ReturnType<typeof getProfile>>, null>;
  username: Exclude<Awaited<ReturnType<typeof requireUser>>, null>["username"];
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await requireUser(request);
  if (user === null) return logout(request);

  const profile = await getProfile(user.id);
  if (!profile) {
    throw new Response("Not Found", { status: 404 });
  }

  return { profile, username: user.username };
};

type ActionDataT =
  | (FormValidationT<Schema1T> &
      FormValidationT<Schema2T> & {
        authError?: string;
      })
  | undefined;

const ProfileEditPage = () => {
  const { profile, username } = useLoaderData() as LoaderDataT;
  const actionData = useActionData() as ActionDataT;
  const transition = useTransition();
  const isSubmitting = transition.state === "submitting";
  const options = ["Profile", "Account"];
  const [selected, setSelected] = useState(options[0]);
  const [revealChangePassword, setRevealChangePassword] = useState(false);

  const handleClick = () => {
    setRevealChangePassword(true);
  };

  useEffect(() => {
    setRevealChangePassword(false);
  }, [selected]);

  return (
    <AppLayout wide>
      <div className="form-page">
        <div className="form-container">
          <FormTabs tabs={options} selected={selected} setSelected={setSelected} />
          {selected === options[0] && (
            <Form method="post" action="#" className="form" autoComplete="off">
              <div className="form-fields">
                <FormInput
                  text="Fullname"
                  label="fullname"
                  type="text"
                  defaultValue={profile.fullname || undefined}
                  disabled={isSubmitting}
                  error={actionData?.errors?.fullname}
                />
                <FormInput
                  text="Email"
                  label="email"
                  type="email"
                  defaultValue={profile.email || undefined}
                  disabled={isSubmitting}
                  error={actionData?.errors?.email}
                />
                <FormRadioGroup
                  text="Gender"
                  label="gender"
                  values={["MALE", "FEMALE"]}
                  defaultChecked={
                    profile.gender === "M" ? "MALE" : profile.gender === "F" ? "FEMALE" : undefined
                  }
                  disabled={isSubmitting}
                  error={actionData?.errors?.gender}
                />
                <FormInput
                  text="Phone"
                  label="phone"
                  type="tel"
                  defaultValue={profile.phone || undefined}
                  disabled={isSubmitting}
                  error={actionData?.errors?.phone}
                />
                <FormTextarea
                  text="Info"
                  label="info"
                  defaultValue={profile.info || undefined}
                  disabled={isSubmitting}
                  error={actionData?.errors?.info}
                />
                <FormCheckbox
                  text="Public"
                  label="isPublic"
                  defaultChecked={profile.is_public}
                  disabled={isSubmitting}
                  error={actionData?.errors?.isPublic}
                />
              </div>
              <div className="form-submit">
                <input type="hidden" id="userId" name="userId" value={profile.user_id} />
                <button className="form-reset" type="reset" disabled={isSubmitting}>
                  ✖
                </button>
                <button
                  className="action-button primary submit-button"
                  type="submit"
                  name="_action"
                  value="updateProfile"
                  disabled={isSubmitting}
                >
                  SUBMIT
                </button>
              </div>
            </Form>
          )}
          {selected === options[1] && (
            <Form method="post" action="#" className="form" autoComplete="off">
              <div className="form-fields">
                <FormInput
                  text="Username"
                  label="username"
                  type="text"
                  defaultValue={username}
                  disabled
                />
              </div>
              {revealChangePassword ? (
                <>
                  <div className="form-fields fields-separator">
                    <FormInput
                      text="Old password"
                      label="oldPassword"
                      type="password"
                      disabled={isSubmitting}
                      error={actionData?.errors?.oldPassword}
                    />
                  </div>
                  <div className="form-fields">
                    <FormInput
                      text="New password"
                      label="newPassword"
                      type="password"
                      disabled={isSubmitting}
                      error={actionData?.errors?.newPassword}
                    />
                    <FormInput
                      text="Confirm new password"
                      label="confirmNewPassword"
                      type="password"
                      disabled={isSubmitting}
                      error={actionData?.errors?.confirmNewPassword}
                    />
                  </div>
                  <div className="form-submit">
                    <input type="hidden" id="username" name="username" value={username} />
                    <button className="form-reset" type="reset" disabled={isSubmitting}>
                      ✖
                    </button>
                    <button
                      className="action-button primary submit-button"
                      type="submit"
                      name="_action"
                      value="updatePassword"
                      disabled={isSubmitting}
                    >
                      SUBMIT
                    </button>
                    <div className="invalid">{actionData?.authError}</div>
                  </div>
                </>
              ) : (
                <ActionButton onClick={handleClick}>Change password</ActionButton>
              )}
            </Form>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default ProfileEditPage;
