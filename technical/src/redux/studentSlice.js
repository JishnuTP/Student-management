import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../supaBaseClient'; // Supabase client setup

// Fetch students from Supabase
export const fetchStudents = createAsyncThunk('students/fetchStudents', async () => {
  const { data, error } = await supabase.from('students').select('*');
  if (error) throw new Error(error.message);
  console.log("data",data);
  
  return data;
});

// Add a new student
export const addStudent = createAsyncThunk('students/addStudent', async (student) => {
    console.log("my ",student);
    
  const { data, error } = await supabase.from('students').insert(student);
  if (error) throw new Error(error.message);
  return data[0]; // Return the new student
});

// Update a student's details
export const updateStudent = createAsyncThunk('students/updateStudent', async (student) => {
  const { data, error } = await supabase.from('students').update(student).eq('id', student.id);
  if (error) throw new Error(error.message);
  return data[0]; // Return the updated student
});

// Delete a student
export const deleteStudent = createAsyncThunk('students/deleteStudent', async (id) => {
  const { data, error } = await supabase.from('students').delete().eq('id', id);
  if (error) throw new Error(error.message);
  return id; // Return the deleted student's ID
});

const studentSlice = createSlice({
  name: 'students',
  initialState: {
    students: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.students.findIndex((student) => student.id === action.payload.id);
        if (index !== -1) {
          state.students[index] = action.payload;
        }
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter((student) => student.id !== action.payload);
      });
  },
});

export default studentSlice.reducer;
