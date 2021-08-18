import { ErrorMessage, Field, Form, Formik } from "formik"
import { Link } from "react-router-dom"
import * as Yup from "yup"
import supabase from "../lib/supabase"

interface SignInFormValues {
  email: string
  password: string
}

const initialValues: SignInFormValues = {
  email: "",
  password: "",
}

const SignInSchema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().required().min(8),
})

function SignIn() {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignInSchema}
      onSubmit={async ({ email, password }, actions) => {
        await supabase.auth.signIn({ email: email, password: password })
        actions.setSubmitting(false)
      }}
    >
      <Form>
        <label htmlFor="email">Email</label>
        <br />
        <Field type="email" name="email" id="email" />
        <br />
        <ErrorMessage name="email" />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <Field type="password" name="password" id="password" />
        <br />
        <ErrorMessage name="password" />
        <br />
        <input type="submit" value="Sign In" /> or{" "}
        <Link to="/signup">Sign Up</Link>
      </Form>
    </Formik>
  )
}

export default SignIn
