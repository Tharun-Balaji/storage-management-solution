
import { Models } from 'node-appwrite';
import React from 'react'
import Thumbnail from './Thumbnail';
import FormattedDateTime from './FormattedDateTime';
import { convertFileSize, formatDateTime } from '@/lib/utils';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

/**
 * The props for the ActionsModalContent component.
 *
 * @property {Models.Document} file - The document file object containing details to display.
 * @property {React.Dispatch<React.SetStateAction<string[]>>} onInputChange - The callback to handle the input change.
 * @property {(email: string) => void} onRemove - The callback to handle the remove of an email.
 */
interface Props {
  file: Models.Document;
  onInputChange: React.Dispatch<React.SetStateAction<string[]>>;
  onRemove: (email: string) => void;
}


/**
 * Renders a thumbnail image along with the file name and creation date.
 *
 * @param {object} props - The properties object.
 * @param {Models.Document} props.file - The document file object containing details to display.
 *
 * @returns {JSX.Element} A div containing a Thumbnail component and file details.
 */
function ImageThumbnail({ file }: { file: Models.Document }) {

  return (
    <div className="file-details-thumbnail">
      <Thumbnail type={file.type} extension={file.extension} url={file.url} />
      <div className="flex flex-col">
        <p className="subtitle-2 mb-1">{file.name}</p>
        <FormattedDateTime date={file.$createdAt} className="caption" />
      </div>
    </div>
  );

}



/**
 * A reusable component for displaying a label-value pair in the file details dialog.
 *
 * @param {{ label: string, value: string }} props - The properties object.
 * @param {string} props.label - The label of the detail row.
 * @param {string} props.value - The value of the detail row.
 *
 * @returns {JSX.Element} A div containing a label and value of the detail row.
 */

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex">
      <p className="file-details-label text-left">{label}</p>
      <p className="file-details-value text-left">{value}</p>
    </div>
  );
}
  



/**
 * Displays detailed information about a file, including its thumbnail, format, size, owner, and last edit date.
 *
 * @param {object} props - The properties object.
 * @param {Models.Document} props.file - The document file object containing details to display.
 *
 * @returns {JSX.Element} A fragment containing an ImageThumbnail and several DetailRow components displaying file information.
 */
function FileDetails({ file }: { file: Models.Document }) {
  return (
    <>
      <ImageThumbnail file={file} />
      <div className="space-y-4 px-2 pt-2">
        <DetailRow label="Format:" value={file.extension} />
        <DetailRow label="Size:" value={convertFileSize(file.size)} />
        <DetailRow label="Owner:" value={file.owners.fullName} />
        <DetailRow label="Last edit:" value={formatDateTime(file.$updatedAt)} />
      </div>
    </>
  );
};

function ShareInput({ file, onInputChange, onRemove }: Props) {

  return (
    <>
      <ImageThumbnail file={file} />

      <div className="share-wrapper">
        <p className="subtitle-2 pl-1 text-light-100">
          Share file with other users
        </p>
        <Input
          type="email"
          placeholder="Enter email address"
          onChange={(e) => onInputChange(e.target.value.trim().split(","))}
          className="share-input-field"
        />
        <div className="pt-4">
          <div className="flex justify-between">
            <p className="subtitle-2 text-light-100">Shared with</p>
            <p className="subtitle-2 text-light-200">
              {file.users.length} users
            </p>
          </div>

          <ul className="pt-2">
            {file.users.map((email: string) => (
              <li
                key={email}
                className="flex items-center justify-between gap-2"
              >
                <p className="subtitle-2">{email}</p>
                <Button
                  onClick={() => onRemove(email)}
                  className="share-remove-user"
                >
                  <Image
                    src="/assets/icons/remove.svg"
                    alt="Remove"
                    width={24}
                    height={24}
                    className="remove-icon"
                  />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );

}

export { FileDetails, ShareInput };