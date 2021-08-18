import { User } from "@supabase/supabase-js"
import { Form, Formik } from "formik"
import { useHistory } from "react-router-dom"
import Button from "../components/Button"
import InputGroup from "../components/InputGroup"
import supabase from "../lib/supabase"

interface CreateSessionProps {
  user: User
}

function CreateSession({ user }: CreateSessionProps) {
  const history = useHistory()
  return (
    <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 mb-6 text-3xl font-extrabold text-gray-900">
            Create a session
          </h2>
          <Formik
            initialValues={{ name: "" }}
            onSubmit={async (values, actions) => {
              const { data: sessions, error } = await supabase
                .from("sessions")
                .insert({ name: values.name, owner_id: user.id })

              if (error) {
                actions.setFieldError("name", error.message)
              } else if (sessions && sessions.length > 0) {
                history.push(`/sessions/${sessions[0].id}`)
              }
            }}
          >
            <Form className="space-y-4">
              <InputGroup label="Name" name="name" />
              <Button type="submit">Start Session</Button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default CreateSession
