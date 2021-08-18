import { Form, Formik } from "formik"
import { Link, useHistory, useLocation } from "react-router-dom"
import * as Yup from "yup"
import supabase from "../lib/supabase"
import { InputGroup, Button } from "./forms"

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
  let history = useHistory()
  let location = useLocation<{ from?: string }>()

  return (
    <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {"Or "}
            <Link
              to="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              sign up for a new account
            </Link>
          </p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={SignInSchema}
          onSubmit={async ({ email, password }, actions) => {
            const { error } = await supabase.auth.signIn({
              email: email,
              password: password,
            })
            if (error) {
              actions.setErrors({ email: error.message })
              actions.setSubmitting(false)
            } else {
              history.push(location.state?.from ?? { pathname: "/" })
            }
          }}
        >
          <Form className="px-8 py-8 bg-white rounded-md shadow-md mt-8 space-y-6">
            <InputGroup label="Email" type="email" name="email" />
            <InputGroup label="Password" type="password" name="password" />
            <div>
              <Button type="submit">Sign in</Button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default SignIn
