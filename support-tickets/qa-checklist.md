
# TicketDesk - QA Checklist

## 1. Description Testing
- [ ] Submit a ticket with a long description (50,000 characters).
- [ ] Character counter displays correctly.
- [ ] Textarea remains usable with long text.
- [ ] Soft warning appears after approximately 5,000 characters.
- [ ] Ticket is inserted successfully.

## 2. Form Validation
- [ ] Empty name is rejected.
- [ ] Subject containing only spaces is rejected.
- [ ] Description containing only spaces or newlines is rejected.
- [ ] Invalid email such as a@b is rejected.
- [ ] Email is trimmed and converted to lowercase.
- [ ] Valid form details are accepted.

## 3. Submission Testing
- [ ] Loading spinner appears during submission.
- [ ] Submit button is disabled while saving.
- [ ] Multiple submissions are prevented.
- [ ] Success confirmation appears after submission.
- [ ] Error message appears if submission fails.

## 4. Dashboard Testing
- [ ] Long ticket subjects do not overflow.
- [ ] Subject text is limited to two lines.
- [ ] Full subject can be viewed using the tooltip.

## 5. Accessibility and Responsive Testing
- [ ] Form works at 375px screen width.
- [ ] No unwanted horizontal scrolling.
- [ ] All inputs are accessible using Tab.
- [ ] Submit button works using Enter or Space.
- [ ] Focus indicators are visible.

## 6. Final Checks
- [ ] No console errors.
- [ ] Ticket successfully appears in Supabase.
- [ ] npm run build completes successfully.
