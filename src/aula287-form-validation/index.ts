import z from 'zod';
const formElement = document.querySelector('form') as HTMLFormElement;
const SHOW_ERROR_MESSAGE = 'show-error-message';

const username = document.querySelector('#username') as HTMLInputElement;
const email = document.querySelector('#email') as HTMLInputElement;
const password = document.querySelector('#password') as HTMLInputElement;
const confirm = document.querySelector('#password2') as HTMLInputElement;

const formSchema = z
  .object({
    username: z.string().min(6, 'username must have minimum 10 character'),
    email: z.string().email('Email invalido'),
    password: z.string().min(12, 'password must have minimum 12 character '),
    confirm: z.string(),
  })
  .refine((data) => data.confirm === data.password, {
    message: "password don't match",
    path: ['confirm'],
  });

type FormData = z.infer<typeof formSchema>;
type FormInputs = {
  username: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
  confirm: HTMLInputElement;
};

formElement.addEventListener('submit', function (e) {
  e.preventDefault();
  hideErrorMsg(this);
  validateForm({ username, email, password, confirm });
});

function validateForm({ username, email, password, confirm }: FormInputs) {
  const formData: FormData = {
    username: username.value,
    email: email.value,
    password: password.value,
    confirm: confirm.value,
  };

  try {
    formSchema.parse(formData);
    console.log('Successes Submit');
  } catch (e) {
    if (e instanceof z.ZodError) {
      const errorsArr = e.issues;
      handleError(errorsArr, { username, email, password, confirm });
      return;
    }
    console.log('Erro desconhecido');
  }
}

function setErrorMsg(input: HTMLInputElement, msg: string) {
  const formFields = input.parentElement;
  const errorMsg = formFields?.querySelector(
    '.error-message',
  ) as HTMLSpanElement;
  errorMsg.innerText = msg;
  formFields?.classList.add(SHOW_ERROR_MESSAGE);
}

function hideErrorMsg(form: HTMLFormElement) {
  form.querySelectorAll('.' + SHOW_ERROR_MESSAGE).forEach((value) => {
    value.classList.remove(SHOW_ERROR_MESSAGE);
  });
}

function handleError(
  errorsArr: z.ZodIssue[],
  { username, email, password, confirm }: FormInputs,
) {
  errorsArr.forEach((value) => {
    if (value.path[0] === 'username') {
      setErrorMsg(username, value.message);
    }
    if (value.path[0] === 'email') {
      setErrorMsg(email, value.message);
    }
    if (value.path[0] === 'password') {
      setErrorMsg(password, value.message);
    }
    if (value.path[0] === 'confirm') {
      setErrorMsg(confirm, value.message);
    }
  });
}
