import { Form, Formik } from "formik"
import { Link, useHistory, useLocation } from "react-router-dom"
import * as Yup from "yup"
import supabase from "../lib/supabase"
import { InputGroup, Button } from "../components"

interface SignUpFormValues {
  email: string
  password: string
}

const initialValues: SignUpFormValues = {
  email: "",
  password: "",
}

const SignUpSchema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().required().min(8),
})

function SignUp() {
  let history = useHistory()
  let location = useLocation<{ from?: string }>()

  return (
    <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign up for an account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {"Or "}
            <Link
              to="/signin"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={SignUpSchema}
          onSubmit={async ({ email, password }, actions) => {
            const { error } = await supabase.auth.signUp({
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
              <Button className="w-full" type="submit">
                Sign up
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default SignUp
