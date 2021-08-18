-- Represents a scrum session

CREATE TABLE public.sessions (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::TEXT, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::TEXT, now()) NOT NULL,
  owner_id uuid REFERENCES auth.users(id) NOT NULL,
  name TEXT NOT NULL
);
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- Allow the owner (creator) of a session to create, read, and update that session

CREATE POLICY "Owners can view their sessions."
  ON sessions FOR SELECT
  USING ( auth.uid() = owner_id );
  
CREATE POLICY "Users can insert sessions they own."
  ON sessions FOR INSERT
  WITH CHECK ( auth.uid() = owner_id );
  
CREATE POLICY "Owners can update their sessions."
  ON sessions FOR UPDATE
  USING ( auth.uid() = owner_id );

-- The `participants` table models the many to many relationship between users and sessions

CREATE TABLE public.participants (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::TEXT, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::TEXT, now()) NOT NULL,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  session_id uuid REFERENCES public.sessions(id) NOT NULL,
  UNIQUE (user_id, session_id)
);
CREATE INDEX ON participants (user_id);
CREATE INDEX ON participants (session_id);

-- The policy here is complicated looking, but it essentially says that a user can view a session if a record in `participants` exists that ties them to it

CREATE POLICY "Participants can view their sessions."
  ON sessions FOR SELECT
  USING ( EXISTS (SELECT * FROM participants WHERE session_id = sessions.id AND user_id = auth.uid()) );
